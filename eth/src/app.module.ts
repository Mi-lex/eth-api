import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { app, postgres } from './config';
import { EthereumModule } from './modules/ethereum/ethereum.module';
import validationSchema from './config/validationSchema';
import postgresConfig from './config/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      load: [app, postgres],
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<ConfigType<typeof postgresConfig>>(
          'postgres',
        )!;

        return {
          type: 'postgres' as any,
          host: dbConfig.HOST,
          port: dbConfig.PORT,
          username: dbConfig.USER,
          password: dbConfig.PASS,
          database: dbConfig.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    EthereumModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
