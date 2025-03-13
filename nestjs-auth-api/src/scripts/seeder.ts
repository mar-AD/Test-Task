import { DataSource } from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { hashPassword } from '../auth/utils/hash.pass';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({ isGlobal: true });

async function seed() {
    const configService = new ConfigService();

    const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity],
        synchronize: true,
    });

    await dataSource.initialize();

    const userRepository = dataSource.getRepository(UserEntity);
    const hashPass = await hashPassword('password123');

    const user = userRepository.create({
        email: 'test2@example.com',
        password: hashPass,
    });

    await userRepository.save(user);
    console.log(' user created..:', user);

    await dataSource.destroy();
}

seed().catch((err) => {
    console.error('seeding usert failed:', err);
});
