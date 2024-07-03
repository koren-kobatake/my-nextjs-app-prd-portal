// TabsDemo/index.tsx
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const TabsDemo = () => {
    return (
        <Tabs defaultValue="about" className="w-[800px] h-[400px]">
            <TabsList className="w-full">
                <TabsTrigger value="about" className="w-1/2">
                    About
                </TabsTrigger>
                <TabsTrigger value="contact" className="w-1/2">
                    Contact
                </TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="w-full h-full">
                <Card className="w-full h-full flex flex-col justify-between">
                    <CardHeader className="text-center">
                        <CardTitle>About</CardTitle>
                        <CardDescription>
                            Dolor voluptatibus eum dolores blanditiis cumque eaque! Laboriosam neque
                            illum ab tempore quae sapiente? Culpa repellat facilis accusamus maiores
                            quibusdam consectetur quidem expedita Deleniti tempore voluptates
                            aliquid perferendis incidunt! Rem.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full flex items-center justify-center">
                        <div className="w-2/3">
                            <div className="">
                                <div>
                                    <strong className="text-2xl">
                                        Consectetur eveniet magnam debitis dolorum iste Quam
                                        sequiquisquam
                                    </strong>
                                    <br />
                                    <br />
                                    doloribus sed eos In quod sunt delectus voluptatibus a
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    Consectetur exercitationem asperiores nihil vel autem Explicabo
                                    ipsa corrupti vitae accusantium nam modi, repellat. Aliquid
                                    temporibus
                                    <br />
                                    <strong className="text-md">
                                        consectetur neque fugit quasi Cupiditate aliquam hic
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Detail</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="contact" className="w-full h-full">
                <Card className="w-full h-full flex flex-col justify-between">
                    <CardHeader className="text-center">
                        <CardTitle>Contact</CardTitle>
                        <CardDescription>
                            Sit omnis libero facere rem reprehenderit Quis quasi dolor itaque
                            blanditiis repellendus? Explicabo beatae numquam eum unde deserunt
                            voluptates perferendis totam modi sint libero. Laborum sint nihil
                            corporis aliquid delectus.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full flex items-center justify-center">
                        <div className="w-2/3">
                            <div className="">
                                <div className="w-full flex flex-col items-center">
                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        className="transition duration-500 w-[400px] mb-4"
                                    />
                                    <Textarea
                                        className="transition duration-500 w-[600px] h-[150px]"
                                        placeholder="detail"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Send</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};