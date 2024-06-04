"use client";
import {
  LessonPage,
  getLessonPage,
  updateLessonPage,
} from "@/actions/lesson/lesson-page.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  lesson: z.coerce.number(),
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  contents: z.string().min(1, {
    message: "Lesson content is required!",
  }),
  video_link: z.string().min(1, {
    message: "Video Link is required!",
  }),
});

type formSchemaType = z.infer<typeof formSchema>;

type Props = {
  id: number;
};

export function LessonPageUpdateForm({ id }: Props) {
  const [video, setVideo] = useState<File>();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const fetchData = async () => {
    try {
      const result = await getLessonPage(id);
      setLoading(false);
      if (result.error) {
        if (result.statusCode === 404) {
          notFound();
        } else {
          toast.error(result.message);
          return;
        }
      }
      const lessonPage: LessonPage = result;
      form.reset({
        lesson: lessonPage.lesson,
        title: lessonPage.title,
        contents: lessonPage.contents,
        video_link: lessonPage.video_link,
      });
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }

    return () => {
      form.unregister();
    };
  }, [open]);

  const onSubmit = async (values: formSchemaType) => {
    const formData = new FormData();
    if (video) {
      formData.append("video", video);
    }
    Object.keys(values).forEach((key) => {
      formData.append(key, String(values[key as keyof formSchemaType]));
    });
    const result = await updateLessonPage(id, formData);
    if (!result.error) {
      toast("Successfully Updated");
      setOpen(false);
      form.reset();
    }
    toast.error("Something's wrong");
  };

  const onVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Update</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-6xl">
        <DialogHeader>
          <DialogTitle>Update LessonPage Form</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timer</FormLabel>
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
                      <TextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
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
              <DialogFooter>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
