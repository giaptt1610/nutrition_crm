import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 10 }),
  birthYear: integer("birth_year"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  occupation: varchar("occupation", { length: 255 }),
  hometown: varchar("hometown", { length: 255 }),
  note: text("note"),
  createdBy: varchar("created_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const healthProfiles = pgTable("health_profiles", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  heightCm: real("height_cm"),
  weightKg: real("weight_kg"),
  bodyFatPercent: real("body_fat_percent"),
  muscleMass: real("muscle_mass"),
  visceralFat: real("visceral_fat"),
  bloodPressure: varchar("blood_pressure", { length: 20 }),
  allergies: text("allergies"),
  diseases: text("diseases"),
  medications: text("medications"),
  lifestyle: text("lifestyle"),
  sleepHours: real("sleep_hours"),
  stressLevel: varchar("stress_level", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  consultantId: varchar("consultant_id", { length: 255 }),
  summary: text("summary"),
  recommendation: text("recommendation"),
  nextFollowupDate: timestamp("next_followup_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  weight: real("weight"),
  bodyFat: real("body_fat"),
  muscleMass: real("muscle_mass"),
  waist: real("waist"),
  chest: real("chest"),
  arm: real("arm"),
  note: text("note"),
  measuredAt: timestamp("measured_at").defaultNow().notNull(),
});

export const attachments = pgTable("attachments", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 50 }),
  uploadedBy: varchar("uploaded_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
