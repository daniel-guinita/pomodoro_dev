"use client";
import { addLessonPage } from "@/actions/lesson/lesson-page.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextEditor } from "@/components/ui/text-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  id: number;
};

const formSchema = z.object({
  lesson: z.coerce.number(),
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  contents: z.string().min(1, {
    message: "Lesson content is required!",
  }),
  video_link: z.string(),
});

export default function LessonPageForm({ id }: Props) {
  const [video, setVideo] = useState<File>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lesson: id,
      title: "",
      contents: "",
      video_link: "",
    },
  });

  const onVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (video) {
      formData.append("video", video);
    }
    Object.keys(values).forEach((key) => {
      formData.append(
        key,
        String(values[key as keyof z.infer<typeof formSchema>])
      );
    });
    const result = await addLessonPage(formData);
    if (!result.error) {
      toast.success("Successfully Added");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Lesson Page</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-6xl">
        <DialogHeader>
          <DialogTitle>New Lesson Page</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {form.formState.errors.root?.message}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contents</FormLabel>
                  <FormControl>
                    <TextEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Upload Video</FormLabel>
              <FormControl>
                <Input
                  accept="video/*"
                  placeholder=""
                  onChange={onVideoChange}
                  multiple={false}
                  type="file"
                />
              </FormControl>
            </FormItem>

            <Button type="submit">Create Lesson Page</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
