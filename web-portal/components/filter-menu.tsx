"use client";

import { useForm } from "react-hook-form";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import RatingStar from "@/components/rating-star";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import { useEffect, useState } from "react";

export interface FilterMenuPropeTypes {
  filtersMetaData: {
    rating: {
      value: number;
      count: number;
      text: string;
    }[];
    topics: {
      topic_name: string;
      topic_count: number;
    }[];
    languages: {
      language_name: string;
      language_count: string;
    }[];
    price: {
      value: string;
      label: string;
      count: number;
    }[];
    level: {
      value: string;
      label: string;
      count: number;
    }[];
    sub_category?: {
      sub_category_name: string;
      sub_category_count: number;
    }[];
  };
  searchParams: {
    q?: null | string;
    rating: null | number;
    sub_categories?: null | string[];
    topics: null | string[];
    levels: null | string[];
    languages: null | string[];
    price: null | string[];
  };
  hideFilters: string[];
}

export default function FilterMenu({
  filtersMetaData: filters,
  searchParams,
  hideFilters,
}: FilterMenuPropeTypes) {
  const form = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsx = useSearchParams();

  const [accordionDefaultValue, setAccordionDefaultValue] = useState([
    "rating",
  ]);

  const handleFormChange = () => {
    const filters = form.getValues();
    console.log(filters);
    let qq = [];
    if (searchParamsx.has("q")) {
      qq.push(`q=${searchParamsx.get("q")}&`);
    }

    if (filters.rating) qq.push(`rating=${filters.rating}&`);

    if (filters.topics && filters.topics.length)
      qq.push(
        (filters.topics as string[])
          .map((t: string) => `topics=${t}`)
          .join("&")
          .concat("&")
      );

    if (filters.sub_category && filters.sub_category.length)
      qq.push(
        (filters.sub_category as string[])
          .map((s: string) => `sub_category=${s}`)
          .join("&")
          .concat("&")
      );

    if (filters.levels && filters.levels.length)
      qq.push(
        (filters.levels as number[])
          .map((l) => `levels=${l}`)
          .join("&")
          .concat("&")
      );

    if (filters.prices && filters.prices.length)
      qq.push(
        (filters.prices as boolean[])
          .map((p) => `prices=${p}`)
          .join("&")
          .concat("&")
      );

    if (filters.languages && filters.languages.length)
      qq.push(
        (filters.languages as boolean[])
          .map((l) => `languages=${l}`)
          .join("&")
          .concat("&")
      );

    if (searchParamsx.has("sort")) {
      qq.push(`sort=${searchParamsx.get("sort")}`);
    }
    const query = `/?${qq.join("")}`;

    router.replace(pathname + query);
  };

  useEffect(() => {
    const ad = ["rating"];
    if (searchParams.rating)
      form.setValue("rating", searchParams.rating.toString());
    else form.resetField("rating");

    if (searchParams.topics) {
      form.setValue("topics", searchParams.topics);
      ad.push("topics");
    } else form.setValue("topics", []);
    if (searchParams.sub_categories) {
      ad.push("sub_category");
      form.setValue("sub_category", searchParams.sub_categories);
    } else form.setValue("sub_category", []);
    if (searchParams.levels) {
      ad.push("level");
      form.setValue("levels", searchParams.levels);
    } else form.resetField("levels");
    if (searchParams.price) {
      ad.push("price");
      form.setValue("prices", searchParams.price);
    } else form.resetField("prices");
    if (searchParams.languages) {
      ad.push("languages");
      form.setValue("languages", searchParams.languages);
    }

    setAccordionDefaultValue(ad);
  }, [searchParams]);

  return (
    <Form {...form}>
      <Accordion
        type="multiple"
        value={accordionDefaultValue}
        onValueChange={(v) => setAccordionDefaultValue(v)}
        className="w-full"
      >
        <AccordionItem value="rating">
          <AccordionTrigger className="text-xl font-medium">
            Ratings
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3 py-4">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(v) => {
                        field.onChange(v);
                        handleFormChange();
                      }}
                      // defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {filters.rating.map((f) => (
                        <FormItem
                          key={f.text}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={f.value.toString()}
                              checked={f.value.toString() === field.value}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <RatingStar rating={f.value}>
                              {f.text}({f.count})
                            </RatingStar>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="topics" hidden={hideFilters.includes("topics")}>
          <AccordionTrigger className="text-xl font-medium">
            Topics
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="topics"
              defaultValue={[]}
              render={({}) => (
                <FormItem className="space-y-3 py-4">
                  {filters.topics.map((t) => (
                    <FormField
                      key={t.topic_name}
                      control={form.control}
                      name="topics"
                      render={({ field }) => (
                        <FormItem
                          key={t.topic_name}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(t.topic_name)}
                              className="rounded-none border-2 box-content"
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([
                                      ...field?.value,
                                      t.topic_name,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) =>
                                          value !== t.topic_name
                                      )
                                    );
                                handleFormChange();
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t.topic_name}({t.topic_count})
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="sub_category"
          hidden={hideFilters.includes("sub_category")}
        >
          <AccordionTrigger className="text-xl font-medium">
            Sub Category
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="sub_category"
              defaultValue={[]}
              render={({}) => (
                <FormItem className="space-y-3 py-4">
                  {filters?.sub_category?.map((sc) => (
                    <FormField
                      key={sc.sub_category_name}
                      control={form.control}
                      name="sub_category"
                      render={({ field }) => (
                        <FormItem
                          key={sc.sub_category_name}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(
                                sc.sub_category_name
                              )}
                              className="rounded-none border-2 box-content"
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([
                                      ...field?.value,
                                      sc.sub_category_name,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) =>
                                          value !== sc.sub_category_name
                                      )
                                    );
                                handleFormChange();
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {sc.sub_category_name}({sc.sub_category_count})
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger className="text-xl font-medium">
            Level
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="levels"
              defaultValue={[]}
              render={({}) => (
                <FormItem className="space-y-3 py-4">
                  {filters.level.map((l) => (
                    <FormField
                      key={l.label}
                      control={form.control}
                      name="levels"
                      render={({ field }) => (
                        <FormItem
                          key={l.label}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(l.value)}
                              className="rounded-none border-2 box-content"
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([...field?.value, l.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== l.value
                                      )
                                    );
                                handleFormChange();
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {l.label}({l.count})
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-xl font-medium">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="prices"
              defaultValue={[]}
              render={({}) => (
                <FormItem className="space-y-3 py-4">
                  {filters.price.map((p) => (
                    <FormField
                      key={p.label}
                      control={form.control}
                      name="prices"
                      render={({ field }) => (
                        <FormItem
                          key={p.label}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(p.value)}
                              className="rounded-none border-2 box-content"
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([...field?.value, p.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== p.value
                                      )
                                    );
                                handleFormChange();
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {p.label}({p.count})
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="languages">
          <AccordionTrigger className="text-xl font-medium">
            Language
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="languages"
              defaultValue={[]}
              render={({}) => (
                <FormItem className="space-y-3 py-4">
                  {filters.languages.map((l) => (
                    <FormField
                      key={l.language_name}
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem
                          key={l.language_name}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(l.language_name)}
                              className="rounded-none border-2 box-content"
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([
                                      ...field?.value,
                                      l.language_name,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) =>
                                          value !== l.language_name
                                      )
                                    );
                                handleFormChange();
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {l.language_name}({l.language_count})
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Form>
  );
}
