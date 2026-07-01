import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export interface SidebarItem {
  name: string;
  value: string;
  count?: string | number;
  avatar?: string;
  icon?: ReactNode;
}

interface SidebarListProps {
  items: SidebarItem[];
  title: string;
  description: string;
}

export function SidebarList({ items, title, description }: SidebarListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-lg border">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-medium">
                  {item.avatar || item.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                {item.count !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    {item.count} {typeof item.count === 'number' ? 'items' : ''}
                  </p>
                )}
              </div>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
