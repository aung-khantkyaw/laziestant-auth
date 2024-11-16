import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PropTypes from "prop-types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GlobeIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const linkTypeSelectOptions = [
  { value: "website", label: "Website" },
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
];

const getLinkIcon = (type) => {
  switch (type) {
    case "website":
      return <GlobeIcon className="w-4 h-4" />;
    case "github":
      return <GithubIcon className="w-4 h-4" />;
    case "linkedin":
      return <LinkedinIcon className="w-4 h-4" />;
    case "twitter":
      return <TwitterIcon className="w-4 h-4" />;
    case "instagram":
      return <InstagramIcon className="w-4 h-4" />;
    default:
      return <GlobeIcon className="w-4 h-4" />;
  }
};

const addLinkFormSchema = z.object({
  type: z.string().min(3, "Title must be at least 3 characters"),
  url: z.string().url("Invalid URL"),
});

export default function AddLinkPage({ user }) {
  const { addLink, successType, errorType } = authService();
  const { toast } = useToast();

  const userId = user?.id;

  const addLinkForm = useForm({
    resolver: zodResolver(addLinkFormSchema),
    defaultValues: {
      type: "",
      url: "",
    },
  });

  const addNewLink = async (data) => {
    const { type, url } = data;
    try {
      await addLink({ type, url, userId });
      addLinkForm.reset();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  useEffect(() => {
    if (successType === "added-link") {
      toast({
        title: "Link added",
        description: "Your link has been added to your profile.",
      });
    }

    if (errorType === "error") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was an issue updating your profile. Please try again.",
      });
    }
  }, [successType, toast]);

  return (
    <Card className="max-w-4xl mx-auto mb-4">
      <CardHeader>
        <CardTitle className="text-xl">Add Link</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...addLinkForm}>
          <form
            onSubmit={addLinkForm.handleSubmit(addNewLink)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={addLinkForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange} // Updates form state when a value is selected
                        value={field.value} // Binds the field value to the Select component
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Link Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {linkTypeSelectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addLinkForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Add Link</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {user?.links && (
          <div className="grid gap-2">
            <div className="flex flex-col space-y-2">
              {user?.links?.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {getLinkIcon(link.type)}
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

AddLinkPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
