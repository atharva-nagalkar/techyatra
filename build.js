const { execSync } = require('child_process');
const path = require('path');

console.log('Building frontend...');
try {
  // Build frontend
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  execSync('npm run build', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend built successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
