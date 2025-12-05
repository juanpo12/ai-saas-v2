ALTER TABLE "agents" ADD COLUMN "agent_display_name" text;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "backup_provider_slug" text;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "backup_provider_key_id" uuid;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "backup_model" text;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "temperature" double precision DEFAULT 0.7;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "max_tokens" integer DEFAULT 1000;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "channel" text;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "channel_connection_id" uuid;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "has_specific_knowledge" boolean;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "filters" jsonb;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "tools" jsonb;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "tools_input_production" jsonb;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "tools_input_development" jsonb;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_backup_provider_key_id_provider_keys_id_fk" FOREIGN KEY ("backup_provider_key_id") REFERENCES "public"."provider_keys"("id") ON DELETE no action ON UPDATE no action;