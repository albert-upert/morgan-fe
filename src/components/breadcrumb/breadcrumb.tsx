import Link from "@/components/link";
import Typography from "@/components/typography/typography";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: Array<BreadcrumbItem>;
  /**
   * Optional onClick handler for breadcrumb items (useful for Storybook)
   * When provided, regular anchor tags will be used instead of router Links
   */
  onItemClick?: (href: string, label: string) => void;
}

export default function Breadcrumb({ items, onItemClick }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center gap-0"
      aria-label="Breadcrumb"
      data-name="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <div key={index} className="flex items-center">
            {!isFirst && (
              <div className="flex h-6 w-6 items-center justify-center">
                <Typography variant="pixie" className="text-gray-600">
                  /
                </Typography>
              </div>
            )}
            {item.href && !isLast ? (
              onItemClick ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick(item.href!, item.label);
                  }}
                  className="text-primary hover:underline"
                >
                  <Typography variant="body-small" className="text-inherit">
                    {item.label}
                  </Typography>
                </a>
              ) : (
                <Link to={item.href}>
                  <Typography variant="body-small" className="text-inherit">
                    {item.label}
                  </Typography>
                </Link>
              )
            ) : (
              <Typography variant="body-small">{item.label}</Typography>
            )}
          </div>
        );
      })}
    </nav>
  );
}
