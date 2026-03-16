import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useUserPersistence } from "@/hooks/use-user-persistence";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

function StreamConfig() {
  const { t } = useTranslation(["views/streamConfig"]);
  const [defaultView, setDefaultView] = useUserPersistence<"grid" | "summary">(
    "live-default-view",
    "summary",
  );
  const dropdownList = useMemo(
    () => [
      {
        label: t("select.deviceCode"),
        value: "deviceCode",
      },
      {
        label: t("select.cdn"),
        value: "cdn",
      },
      {
        label: t("select.domainName"),
        value: "domainName",
      },
      {
        label: t("select.location"),
        value: "location",
      },
      {
        label: t("select.quality.label"),
        value: "quality",
        options: [
          {
            label: t("select.quality.options.hd"),
            value: "hd",
          },
          {
            label: t("select.quality.options.high"),
            value: "high",
          },
          {
            label: t("select.quality.options.medium"),
            value: "medium",
          },
          {
            label: t("select.quality.options.low"),
            value: "low",
          },
        ],
      },
      {
        label: t("select.background"),
        value: "background",
      },
    ],
    [t],
  );
  return (
    <div className="flex flex-col gap-4 p-10 py-30">
      <p className="text-2xl font-bold">{t("title")}</p>
      {dropdownList.map((value) => (
        <Select
          key={value.value}
          value={defaultView}
          onValueChange={(value) => setDefaultView(value as "grid" | "summary")}
        >
          <SelectTrigger className="w-full">{value.label}</SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {value.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  className="cursor-pointer"
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
      <Button className="w-20 self-end" variant="select">
        Save
      </Button>
    </div>
  );
}

export default StreamConfig;
