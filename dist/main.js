"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: { credentials: true, origin: process.env.CLIENT_URL } });
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map