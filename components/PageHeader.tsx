import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PageHeaderProps = {
  title: string;
  description?: string;
  image?: string; // Optional image URL
  backLink?: {
    url: string;
    label?: string; // Optional custom label for the back link
  };
  primaryButton?: {
    label: string;
    onClick: () => void;
    variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
    variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  };
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  image,
  backLink,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <div className="flex flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
            {image && (
                <img src={image} alt="Page Icon" className="w-12 h-12 object-cover rounded-full" />
            )}
            <div className='flex flex-col gap-2'>
                {backLink && backLink.url && ( // Check if backLink.url is defined
                    <Link href={backLink.url} legacyBehavior>
                        <a className="text-primary hover:underline flex items-center gap-2">
                            <span className='material-icons'>arrow_back</span>
                            {backLink.label || 'Back'} {/* Use custom label if provided */}
                        </a>
                    </Link>
                )}
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && <p className="text-card-foreground max-w-2xl">{description}</p>}
            </div>
        </div>
        <div className="flex gap-2">
            {primaryButton && (
            <Button onClick={primaryButton.onClick} variant={primaryButton.variant || 'default'}>
                {primaryButton.label}
            </Button>
            )}
            {secondaryButton && (
            <Button onClick={secondaryButton.onClick} variant={secondaryButton.variant || 'secondary'}>
                {secondaryButton.label}
            </Button>
            )}
        </div>
    </div>
  );
};
