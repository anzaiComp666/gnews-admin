import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

export enum DailyFreeCalcMode {
    accumulate = 0, // 已观看过的视频再次观看不再消耗次数
    reset = 1,      // 已观看过的视频非当日观看仍然消耗次数
}


@Entity('app_config')
export class AppConfigEntity extends BaseEntity {

    @Column('tinyint', { comment: "每日免费计算方式", default: DailyFreeCalcMode.accumulate })
    dailyFreeCalcMode: DailyFreeCalcMode;

    @Column('int', { comment: "每日免费观看次数", default: 2 })
    dailyFreeCount: number;

    @Column('longtext', { comment: "充值提示" })
    rechargeTips: string;

    @Column('longtext', { comment: "支付提示" })
    paymentTips: string;

    @Column('float', { default: 0.30, comment: "邀请返现比例" })
    inviteRebateRate: number;
}

export type IAppConfigEntity = InstanceType<typeof AppConfigEntity>