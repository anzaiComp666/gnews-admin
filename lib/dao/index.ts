import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import { globalConfigs } from '../config';
import { AdminUserEntity } from './admin/admin-user';
import { BannerEntity } from './biz/banner';
import { GappVideoEntity } from './gapp/gapp_video.entity';
import { GappVideoLabelEntity } from './gapp/gapp_video_label.entity';
import { GappVideoLabelRelationEntity } from './gapp/gapp_video_label_relation.entity';
import { GappVideoLabelParentEntity } from './gapp/gapp_video_label_parent.entity';
const entities: { [key: string]: any[] } = {
    admin: [
        AdminUserEntity,
    ],
    biz: [
        BannerEntity,
    ],
    gapp: [
        GappVideoEntity,
        GappVideoLabelEntity,
        GappVideoLabelParentEntity,
        GappVideoLabelRelationEntity,
    ]
};

class DataSourceContext {
    private dataSource: DataSource;

    constructor(private readonly namespace: string) {
        this.dataSource = new DataSource(this.generateDataSourceOptions());
    }

    private generateDataSourceOptions(): DataSourceOptions {
        const config = globalConfigs.db[this.namespace];
        return {
            type: 'mysql',
            host: config.host,
            port: 3306,
            username: config.username,
            password: config.password,
            database: config.database,
            entities: entities[this.namespace],
            synchronize: config.synchronize ?? false,
            timezone: config.timezone,
            maxQueryExecutionTime: 500,
        };
    }

    async withDataSource<T>(
        fn: (manager: EntityManager) => Promise<T>
    ): Promise<T> {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
        }

        return fn(this.dataSource.manager);
    }

    async withDataSourceTransaction<T>(
        fn: (manager: EntityManager) => Promise<T>
    ): Promise<T> {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
        }

        return this.dataSource.transaction(fn);
    }
}

function initDataSources() {
    return {
        admin: new DataSourceContext('admin'),
        biz: new DataSourceContext('biz'),
    };
}

export const dataSources = initDataSources();
