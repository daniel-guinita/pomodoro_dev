"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value?: string | null;
  onChange: (value?: string | null) => void;
  onSearch: (value: string) => void;
  data: any;
  label: string;
  nestedLabel?: string;
};

export const AutoComplete = ({
  value,
  onChange,
  onSearch,
  data,
  label,
  nestedLabel,
}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const getLabel = () => {
    const foundItem = data.find((item: any) => item.id === value);
    return foundItem
      ? nestedLabel
        ? foundItem[label][nestedLabel]
        : foundItem[label]
      : "Select data";
  };

  useEffect(() => {
    const debounced = setTimeout(async () => {
      onSearch(searchValue);
    }, 300);
    return () => clearTimeout(debounced);
  }, [searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between w-full",
              !value && "text-muted-foreground"
            )}
          >
            {value ? getLabel() : "Select data"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search here..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          {data.length > 0 && (
            <>
              <CommandGroup>
                {data.map((item: any) => (
                  <CommandItem
                    value={nestedLabel ? item[label][nestedLabel] : item[label]}
                    key={item.id}
                    onSelect={() => {
                      onChange(item.id);
                      setOpen(false);
                    }}
                  >
                    {nestedLabel ? item[label][nestedLabel] : item[label]}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          <CommandGroup>
            <Button asChild variant="destructive">
              <CommandItem
                onSelect={() => {
                  onChange(undefined);
                  setSearchValue("");
                  setOpen(false);
                }}
                className="flex justify-center"
              >
                Remove Data
              </CommandItem>
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
