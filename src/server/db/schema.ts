// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `petsy_${name}`);

export const users = createTable(
  "users",
  {
    id: serial("id").notNull().unique(),
    userId: uuid("userId").notNull().defaultRandom().unique().primaryKey(),
    firstName: varchar("lastName", { length: 50 }).notNull(),
    lastName: varchar("lastName", { length: 50 }).notNull(),
    email: varchar("email", { length: 128 }).notNull().unique(),
    address1: varchar("address1", { length: 128 }).notNull(),
    city: varchar("city", { length: 128 }).notNull(),
    state: varchar("state", { length: 50 }).notNull(),
    postalCode: varchar("postalCode", { length: 50 }).notNull(),
    dateOfBirth: varchar("dateOfBirth", { length: 50 }).notNull(),
    password: varchar("password", { length: 50 }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(() => new Date()),
  },
  (example) => ({
    emailIndex: index("name_idx").on(example.email),
  })
);

export const sessions = createTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.userId),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("user_id_idx").on(table.userId),
  })
);
