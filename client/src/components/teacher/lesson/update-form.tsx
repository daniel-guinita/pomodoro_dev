"use client";
import {
  Lesson,
  getLesson,
  updateLesson,
} from "@/actions/lesson/lesson.action";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  subtitle: z.string().min(1, {
    message: "Subtitle is required!",
  }),
});

type Props = {
  id: number;
};

export default function UpdateLessonForm({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });
  const [coverImage, setCoverImage] = useState<File>();
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const fetchData = async () => {
    try {
      const result = await getLesson(id);
      setLoading(false);
      if (result.error) {
        if (result.statusCode === 404) {
          notFound();
        } else {
          toast.error(result.message);
          return;
        }
      }
      const lesson: Lesson = result;
      if (lesson.coverImage) {
        setCoverImageUrl(lesson.coverImage);
      }
      form.reset({
        title: lesson.title,
        subtitle: lesson.subtitle,
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

  const onCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    Object.keys(values).forEach((key) => {
      formData.append(
        key,
        String(values[key as keyof z.infer<typeof formSchema>])
      );
    });
    const result = await updateLesson(id, formData);
    if (!result.error) {
      toast.success("Successfully Updated");
      router.push(`/teacher/lesson/${result.id}`);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Update</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Update LessonPage Form</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
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
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Upload Cover Image</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    placeholder=""
                    onChange={onCoverImageChange}
                    multiple={false}
                    type="file"
                  />
                </FormControl>
                {coverImage && (
                  <AspectRatio>
                    <Image
                      alt="Cover Image"
                      height={200}
                      width={200}
                      src={URL.createObjectURL(coverImage)}
                      className="rounded-md object-scale-down"
                    />
                  </AspectRatio>
                )}
                {!coverImage && coverImageUrl && (
                  <AspectRatio>
                    <Image
                      alt="Cover Image"
                      fill
                      src={coverImageUrl}
                      className="rounded-md object-scale-down"
                    />
                  </AspectRatio>
                )}
              </FormItem>

              <Button type="submit">Update</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
