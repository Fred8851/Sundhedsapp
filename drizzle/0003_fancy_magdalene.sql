ALTER TABLE "diary_post" RENAME TO "data_post";--> statement-breakpoint
ALTER TABLE "data_post" DROP CONSTRAINT "diary_post_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "data_post" ADD COLUMN "value" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "data_post" ADD CONSTRAINT "data_post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_post" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "data_post" DROP COLUMN "content";