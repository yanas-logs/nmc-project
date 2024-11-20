"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category: z.string(),
});

interface PropeTypes {
  session: User;
}

export default function CreateNewCourse({ session }: PropeTypes) {
  const supabase = createClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: undefined,
    },
  });

  const {
    refetch,
    isRefetching,
    error: categoriesFetchError,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      supabase
        .from("categories")
        .select("id, name")
        .throwOnError()
        .then((res) => res.data),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error: createNewCourseError } = await supabase.rpc(
      "create_new_course",
      {
        category_id: Number.parseInt(values.category, 10),
        title: values.title,
        user_id: session.id,
      }
    );

    if (createNewCourseError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: createNewCourseError?.message,
      });
    }

    if (createNewCourseError === null) {
      toast({
        title: "Success!",
        description: "Course created successfully!",
      });
      form.reset();
      setOpen(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <div className="relative">
          {categoriesFetchError ? (
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.8)] flex items-center justify-center">
              <div>
                <h2 className="text-lg mb-2">Something went wrong!</h2>
                <p className="text-sm text-gray-500 mb-3">
                  {categoriesFetchError?.message}
                </p>
                <Button onClick={() => refetch()} disabled={isRefetching}>
                  {isRefetching ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Try again
                </Button>
              </div>
            </div>
          ) : null}

          <DialogHeader>
            <DialogTitle>New Course</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Learn Python" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display title for you course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Category..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-y-auto max-h-[15rem]">
                        {categories?.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the category under which your course comes in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
