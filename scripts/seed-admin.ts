import { loadEnvConfig } from '@next/env';

// Load environment variables (.env.local, .env) before importing auth
loadEnvConfig(process.cwd());

async function seedAdmin() {
  const { auth } = await import('../lib/auth');

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123456!';
  const name = process.env.ADMIN_NAME || 'Portfolio Admin';

  console.log(`[Better Auth] Seeding admin account: ${email}...`);

  try {
    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (res) {
      console.log(`✅ Admin account created successfully! You can now log in at /admin/login.`);
    }
  } catch (err: any) {
    if (
      err.message?.includes('already exists') ||
      err.message?.includes('USER_ALREADY_EXISTS') ||
      err.status === 400
    ) {
      console.log(`ℹ️ Admin user (${email}) already exists.`);
    } else {
      console.error(`❌ Failed to create admin:`, err.message || err);
    }
  }
  process.exit(0);
}

seedAdmin();
