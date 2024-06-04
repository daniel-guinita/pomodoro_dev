"use client";
import {
  QuizQuestion,
  getQuizQuestion,
  updateQuizQuestion,
} from "@/actions/quiz/question.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const answerFormSchema = z.object({
  id: z.number().optional(),
  text: z.string().min(1, {
    message: "Question is required!",
  }),
  is_correct: z.boolean().default(false).optional(),
});

const formSchema = z.object({
  lesson_page: z.number(),
  text: z.string().min(1, {
    message: "Question is required!",
  }),
  answers: z.array(answerFormSchema),
});

type Props = {
  id: number;
};

export default function UpdateQuizQuestionForm({ id }: Props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control: form.control,
  });

  const fetchData = async () => {
    try {
      const result = await getQuizQuestion(id);
      setLoading(false);
      if (result.message) {
        if (result.statusCode === 404) {
          notFound();
        } else {
          toast.error(result.message);
          return;
        }
      }
      const question: QuizQuestion = result;
      form.reset({
        lesson_page: question.lesson_page,
        text: question.text,
        answers: question.answers,
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateQuizQuestion(id, values);
    if (!result.message) {
      toast.success("Successfully Updated");
      setOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Update Quiz Question</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Update Quiz Question Form</DialogTitle>
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
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-2">
                <Separator />
                <div className="flex justify-between">
                  <h5>Choices</h5>
                  <Button
                    type="button"
                    onClick={() => append({ text: "", is_correct: false })}
                  >
                    Add Choices
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div className="flex gap-3 items-end" key={field.id}>
                    <FormField
                      control={form.control}
                      name={`answers.${index}.is_correct`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`answers.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant="outline" onClick={() => remove(index)}>
                      <X />
                    </Button>
                  </div>
                ))}
              </div>

              <Button type="submit">Update Question</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
