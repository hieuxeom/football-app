import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Avatar, Button} from "@nextui-org/react";
import {IoChatbubble, IoHeart} from "react-icons/io5";
import clsx from "clsx";

export default function Feed() {

    const [isLike, setIsLike] = useState<boolean>(false)

    const handleLike = () => {
        setIsLike(!isLike);
    }
    return (
        <Card className="pb-4 px-2 relative overflow-visible">
            <CardHeader className="flex gap-3">
                <Avatar src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"/>
                <div className="flex flex-col">
                    <p className="text-md">NextUI</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>

            <CardBody>
                <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
            <CardFooter className="absolute bottom-0 left-0 translate-y-1/2 flex gap-4">
                <Button
                    color={isLike ? "danger" : "default"}
                    startContent={<IoHeart size="20px"/>}
                    onClick={handleLike}
                >
                    Like
                </Button>
            </CardFooter>
        </Card>
    )
}