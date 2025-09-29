import { IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

interface Props {
    info: CellContext<IGappVideoLabelEntity, unknown>
}

export const ChildrenCell = (props: Props) => {
    const { info } = props

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="link" className="cursor-pointer">
                    {info.getValue() as number}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

