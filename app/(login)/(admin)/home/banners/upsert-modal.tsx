// import { useProModal } from "@/app/_heroui/pro-modal/hooks"
// import { IBannerEntity } from "@/lib/dao/biz/banner"
// import { JumpTypeLabels } from "@/lib/types/jump-type"
// import { Button, Form, Input, ModalBody, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react"

// interface Props {
//     entity?: IBannerEntity
// }
// export const BannerUpsertModalContent = (props: Props) => {

//     const modal = useProModal()
//     const entity = props.entity
//     console.log(entity.jumpType)
//     return (
//         <>

//             <ModalHeader>
//                 {entity ? "编辑轮播" : "添加轮播"}
//             </ModalHeader>

//             <ModalBody>
//                 <Form>
//                     <Input name="name" label="名称" required defaultValue={entity?.name} />
//                     <Input name="imageURL" label="图片地址" required defaultValue={entity?.imageURL} />
//                     <Input name="orderNo" label="排序" type="number" required defaultValue={entity?.orderNo.toString()} />
//                     <Input name="status" label="状态" required defaultValue={entity?.status.toString()} />
//                     <Select name="jumpType" label="跳转类型" required defaultSelectedKeys={[entity?.jumpType.toString()]}>
//                         <SelectItem key={0}>无</SelectItem>
//                         <SelectItem key={1}>视频标签</SelectItem>
//                         <SelectItem key={2}>视频</SelectItem>
//                     </Select>
//                     <Input name="jumpData" label="跳转数据" required defaultValue={entity?.jumpData.toString()} />
//                 </Form>
//             </ModalBody>

//             <ModalFooter>
//                 <Button color="danger" variant="light" onPress={modal.onClose}>
//                     关闭
//                 </Button>
//                 <Button color="primary">
//                     保存
//                 </Button>
//             </ModalFooter>
//         </>
//     )
// }

