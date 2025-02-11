import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente/cliente.module';
import { Cliente } from './modules/cliente/cliente.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_project',
      entities: [Cliente],
      synchronize: true,
    }),
    ClienteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


