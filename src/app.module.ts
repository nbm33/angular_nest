import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResetModule } from './reset/reset.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '03n17s17m17s',
      database: 'nest_auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ResetModule,
    RoleModule,
    PermissionModule,
    CommonModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
