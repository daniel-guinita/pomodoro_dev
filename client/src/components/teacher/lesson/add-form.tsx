"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { addLesson } from "@/actions/lesson/lesson.action";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  subtitle: z.string().min(1, {
    message: "Subtitle is required!",
  }),
});

export default function CreateLesson() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });

  const [files, setFiles] = useState<File[]>();
  const [coverImage, setCoverImage] = useState<File>();

  const onCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0]);
    }
  };

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    if (files) {
      files.forEach((file) => {
        formData.append("files[]", file);
      });
    }
    Object.keys(values).forEach((key) => {
      formData.append(
        key,
        String(values[key as keyof z.infer<typeof formSchema>])
      );
    });
    const result = await addLesson(formData);
    if (!result.error) {
      toast.success("Successfully Added");
      // Redirect to add pages
      router.push(`/teacher/lesson/${result.id}`)
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
            <Image
              alt="Cover Image"
              width={200}
              height={200}
              src={URL.createObjectURL(coverImage)}
              className="rounded-md object-scale-down"
            />
          )}
        </FormItem>

        <FormItem>
          <FormLabel>Upload Files</FormLabel>
          <FormControl>
            <Input onChange={onFilesChange} type="file" multiple />
          </FormControl>
          <ul className="list-decimal">
            {files && files.map((file) => <li>{file.name}</li>)}
          </ul>
        </FormItem>

        <Button type="submit">Create A Lesson</Button>
      </form>
    </Form>
  );
}
