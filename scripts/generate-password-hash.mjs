// Утилита для генерации bcrypt-хеша пароля оператора.
// Запуск: node scripts/generate-password-hash.mjs "ваш-пароль"
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error('Использование: node scripts/generate-password-hash.mjs "пароль"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log("OPERATOR_PASSWORD_HASH=" + hash);
