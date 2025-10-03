"use client"

import { appConfigSet } from "@/actions/app/config/set"
import { AppConfigSetSchema, AppConfigSetSchemaType } from "@/actions/app/config/set-schema"
import { DailyFreeCalcMode, IAppConfigEntity } from "@/lib/dao/app/app-config"
import { ProButton } from "@/pro-components/pro-button"
import { ProForm, ProFormFieldsRender } from "@/pro-components/pro-form"
import { useTransition } from "react"
import { useAppContext } from "../context"
import { ToastUtil } from "@/lib/toastutil"

interface Props {
    config: IAppConfigEntity | null
}

export const ConfigPage = (props: Props) => {

    const { config } = props
    const app = useAppContext()
    const [isPending, startTransition] = useTransition()
    const onSubmit = async (data: AppConfigSetSchemaType) => {
        startTransition(async () => {
            try {
                await appConfigSet(app.appId, data)
                ToastUtil.success("保存成功")
            } catch (error) {
                ToastUtil.error(error)
            }
        })
    }

    return (
        <ProForm<AppConfigSetSchemaType>
            schema={AppConfigSetSchema}
            fields={{
                dailyFreeCalcMode: {
                    type: 'select',
                    label: "每日免费计算方式",
                    defaultValue: config?.dailyFreeCalcMode ?? DailyFreeCalcMode.accumulate,
                    placeholder: "请选择每日免费计算方式",
                    options: [
                        { label: '累计计算', value: DailyFreeCalcMode.accumulate },
                        { label: '重置计算', value: DailyFreeCalcMode.reset },
                    ],
                    description: (
                        <>
                            <span className="text-xs">累计计算：观看的视频再次观看不消耗次数。</span>
                            <br />
                            <span className="text-xs">重置计算：观看的视频非当日在次观看消耗次数。</span>
                        </>
                    )
                },
                dailyFreeCount: {
                    type: 'numberInput',
                    label: "每日免费观看次数",
                    defaultValue: config?.dailyFreeCount ?? 0,
                    hiddenStepper: true,
                },
                rechargeTips: {
                    type: 'textarea',
                    label: "充值提示",
                    defaultValue: config?.rechargeTips ?? "",
                    placeholder: "请输入充值提示",
                    description: (<span className="text-xs">JSON数组格式</span>)
                },
                paymentTips: {
                    type: 'textarea',
                    label: "支付提示",
                    defaultValue: config?.paymentTips ?? "",
                    placeholder: "请输入支付提示",
                    description: (<span className="text-xs">JSON数组格式</span>)
                },
                inviteRebateRate: {
                    type: 'numberInput',
                    label: "邀请返现比例",
                    defaultValue: config?.inviteRebateRate ?? 0,
                    hiddenStepper: true,
                }
            }}
            onSubmit={onSubmit}
        >


            <div className="flex flex-col gap-5">
                <ProFormFieldsRender className="flex flex-col gap-5" />
                <ProButton type="submit" isLoading={isPending} disabled={isPending} >
                    保存配置
                </ProButton>
            </div>
        </ProForm>
    )
}