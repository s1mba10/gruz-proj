import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <span className="mb-4 text-4xl">{icon}</span>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <Link
        href={href}
        className="text-sm font-medium text-dark transition-colors hover:text-yellow-dark"
      >
        Подробнее →
      </Link>
    </div>
  );
}
