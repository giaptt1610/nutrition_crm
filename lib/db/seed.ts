import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  customers,
  healthProfiles,
  consultations,
  measurements,
  attachments,
} from "./schema";

async function seed() {
  const connectionString = process.env.DATABASE_URL!;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = postgres(connectionString);
  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  // --- Customers ---
  const insertedCustomers = await db
    .insert(customers)
    .values([
      {
        fullName: "Nguyễn Văn An",
        gender: "male",
        birthYear: 1990,
        phone: "0901234567",
        email: "an.nguyen@email.com",
        address: "123 Nguyễn Huệ, Q.1, TP.HCM",
        occupation: "Kỹ sư phần mềm",
        hometown: "Hà Nội",
        note: "Khách hàng VIP, mục tiêu giảm cân",
        createdBy: "admin",
      },
      {
        fullName: "Trần Thị Bình",
        gender: "female",
        birthYear: 1985,
        phone: "0912345678",
        email: "binh.tran@email.com",
        address: "456 Lê Lợi, Q.3, TP.HCM",
        occupation: "Giáo viên",
        hometown: "Đà Nẵng",
        note: "Dị ứng đậu phộng",
        createdBy: "admin",
      },
      {
        fullName: "Lê Hoàng Cường",
        gender: "male",
        birthYear: 1995,
        phone: "0923456789",
        email: "cuong.le@email.com",
        address: "789 Trần Hưng Đạo, Q.5, TP.HCM",
        occupation: "Vận động viên",
        hometown: "Cần Thơ",
        note: "Mục tiêu tăng cơ",
        createdBy: "admin",
      },
    ])
    .returning();

  console.log(`✅ Inserted ${insertedCustomers.length} customers`);

  // --- Health Profiles ---
  const insertedProfiles = await db
    .insert(healthProfiles)
    .values([
      {
        customerId: insertedCustomers[0].id,
        heightCm: 175,
        weightKg: 82,
        bodyFatPercent: 25,
        muscleMass: 35,
        visceralFat: 12,
        bloodPressure: "130/85",
        allergies: "Không",
        diseases: "Tiền tiểu đường",
        medications: "Metformin",
        lifestyle: "Ít vận động, ngồi nhiều",
        sleepHours: 6,
        stressLevel: "high",
      },
      {
        customerId: insertedCustomers[1].id,
        heightCm: 160,
        weightKg: 55,
        bodyFatPercent: 22,
        muscleMass: 25,
        visceralFat: 5,
        bloodPressure: "110/70",
        allergies: "Đậu phộng, hải sản",
        diseases: "Không",
        medications: "Không",
        lifestyle: "Yoga 3 lần/tuần",
        sleepHours: 7.5,
        stressLevel: "medium",
      },
      {
        customerId: insertedCustomers[2].id,
        heightCm: 180,
        weightKg: 78,
        bodyFatPercent: 12,
        muscleMass: 42,
        visceralFat: 4,
        bloodPressure: "120/75",
        allergies: "Không",
        diseases: "Không",
        medications: "Không",
        lifestyle: "Tập gym 6 lần/tuần",
        sleepHours: 8,
        stressLevel: "low",
      },
    ])
    .returning();

  console.log(`✅ Inserted ${insertedProfiles.length} health profiles`);

  // --- Consultations ---
  const insertedConsultations = await db
    .insert(consultations)
    .values([
      {
        customerId: insertedCustomers[0].id,
        consultantId: "consultant-001",
        summary: "Tư vấn chế độ ăn giảm cân, giảm đường huyết",
        recommendation:
          "Giảm tinh bột, tăng rau xanh và protein. Tập đi bộ 30 phút/ngày.",
        nextFollowupDate: new Date("2026-06-01"),
      },
      {
        customerId: insertedCustomers[1].id,
        consultantId: "consultant-001",
        summary: "Tư vấn dinh dưỡng cho người dị ứng thực phẩm",
        recommendation:
          "Thay thế đậu phộng bằng hạt điều. Bổ sung omega-3 từ dầu ô liu.",
        nextFollowupDate: new Date("2026-05-25"),
      },
      {
        customerId: insertedCustomers[2].id,
        consultantId: "consultant-002",
        summary: "Tư vấn chế độ ăn tăng cơ cho VĐV",
        recommendation:
          "Tăng protein lên 2g/kg cân nặng. Chia 5 bữa/ngày. Bổ sung creatine.",
        nextFollowupDate: new Date("2026-05-20"),
      },
    ])
    .returning();

  console.log(`✅ Inserted ${insertedConsultations.length} consultations`);

  // --- Measurements ---
  const insertedMeasurements = await db
    .insert(measurements)
    .values([
      {
        customerId: insertedCustomers[0].id,
        weight: 82,
        bodyFat: 25,
        muscleMass: 35,
        waist: 92,
        chest: 100,
        arm: 34,
        note: "Lần đo đầu tiên",
        measuredAt: new Date("2026-04-01"),
      },
      {
        customerId: insertedCustomers[0].id,
        weight: 80,
        bodyFat: 23,
        muscleMass: 35.5,
        waist: 89,
        chest: 99,
        arm: 34,
        note: "Sau 1 tháng ăn kiêng",
        measuredAt: new Date("2026-05-01"),
      },
      {
        customerId: insertedCustomers[2].id,
        weight: 78,
        bodyFat: 12,
        muscleMass: 42,
        waist: 78,
        chest: 105,
        arm: 38,
        note: "Đo định kỳ hàng tháng",
        measuredAt: new Date("2026-05-01"),
      },
    ])
    .returning();

  console.log(`✅ Inserted ${insertedMeasurements.length} measurements`);

  // --- Attachments ---
  const insertedAttachments = await db
    .insert(attachments)
    .values([
      {
        customerId: insertedCustomers[0].id,
        fileUrl: "/uploads/inbody-an-2026-04.pdf",
        fileType: "inbody",
        uploadedBy: "admin",
      },
      {
        customerId: insertedCustomers[0].id,
        fileUrl: "/uploads/blood-test-an-2026-04.pdf",
        fileType: "xét nghiệm",
        uploadedBy: "admin",
      },
      {
        customerId: insertedCustomers[1].id,
        fileUrl: "/uploads/allergy-test-binh.pdf",
        fileType: "xét nghiệm",
        uploadedBy: "consultant-001",
      },
    ])
    .returning();

  console.log(`✅ Inserted ${insertedAttachments.length} attachments`);

  console.log("🎉 Seeding complete!");

  await client.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
