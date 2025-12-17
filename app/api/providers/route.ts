import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { providers, provider_keys } from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { logger } from "@/lib/logger";
import { encryptApiKey } from "@/lib/utils";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawSlug = (body?.slug ?? "").toString().trim();
    const rawName = (body?.name ?? "").toString().trim();
    const rawKey = (body?.key ?? "").toString().trim();
    const rawLabel = (body?.label ?? "").toString().trim();

    if (!rawSlug || !rawName) {
      return NextResponse.json(
        { error: "Campos requeridos: slug y name" },
        { status: 400 },
      );
    }

    const slug = rawSlug.toLowerCase();
    const name = rawName;

    const existing = await db
      .select()
      .from(providers)
      .where(eq(providers.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      logger.info("Provider ya existe:", existing[0]);
    } else {
      const inserted = await db
        .insert(providers)
        .values({ slug, name })
        .returning();
      logger.info("Provider creado:", inserted[0]);
    }

    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (!rawKey || !rawLabel) {
      return NextResponse.json(
        { error: "Campos requeridos para la key: key y label" },
        { status: 400 },
      );
    }

    const duplicateKey = await db
      .select()
      .from(provider_keys)
      .where(
        and(
          eq(provider_keys.user_id, user.id as string),
          eq(provider_keys.provider_slug, slug),
          eq(provider_keys.label, rawLabel),
        ),
      )
      .limit(1);

    if (duplicateKey.length > 0) {
      return NextResponse.json(
        { error: "Ya existe una key con ese label para el provider" },
        { status: 409 },
      );
    }

    const encrypted = encryptApiKey(rawKey);
    const keyRecord = await db
      .insert(provider_keys)
      .values({
        user_id: user.id as string,
        provider_slug: slug,
        label: rawLabel,
        secret_encrypted: JSON.stringify(encrypted),
      })
      .returning();

    return NextResponse.json(
      { success: true, provider: { slug, name }, key: keyRecord[0] },
      { status: 201 },
    );
  } catch (error) {
    logger.error("Error creando provider:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const url = new URL(request.url);
    const slugParam = url.searchParams.get("slug")?.toLowerCase() ?? null;

    const keys = await db
      .select()
      .from(provider_keys)
      .where(
        slugParam
          ? and(
              eq(provider_keys.user_id, user.id as string),
              eq(provider_keys.provider_slug, slugParam),
            )
          : eq(provider_keys.user_id, user.id as string),
      );

    const slugs = Array.from(new Set(keys.map((k) => k.provider_slug)));
    const providersRows = slugs.length
      ? await db.select().from(providers).where(inArray(providers.slug, slugs))
      : [];
    const bySlug = new Map(providersRows.map((p) => [p.slug, p]));

    const result = keys.map((k) => {
      const prov = bySlug.get(k.provider_slug);
      return {
        id: k.id,
        provider_slug: k.provider_slug,
        provider_name: prov?.name ?? k.provider_slug,
        label: k.label,
        created_at: k.created_at,
        secret_encrypted: k.secret_encrypted,
      };
    });

    return NextResponse.json({ success: true, keys: result });
  } catch (error) {
    logger.error("Error listando providers:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const body = await request.json().catch(() => ({}));
    const id = (body?.id ?? "").toString();
    if (!id) {
      return NextResponse.json({ error: "Campo requerido: id" }, { status: 400 });
    }
    const existing = await db
      .select()
      .from(provider_keys)
      .where(and(eq(provider_keys.id, id), eq(provider_keys.user_id, user.id as string)))
      .limit(1);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Key no encontrada" }, { status: 404 });
    }
    await db.delete(provider_keys).where(eq(provider_keys.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Error eliminando provider key:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    );
  }
}
