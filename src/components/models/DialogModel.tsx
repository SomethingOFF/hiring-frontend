import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface DialogModelProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  Content: React.ReactNode;
  active?: boolean;
  onChange?: () => void;
}

const DialogModel: React.FC<DialogModelProps> = ({
  title,
  description,
  children,
  Content,
  active,
  onChange,
}) => {
  return (
    <Dialog open={active && active} onOpenChange={onChange && onChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">{Content}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModel;
