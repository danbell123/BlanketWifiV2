import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PageHeaderProps = {
  title: string;
  description?: string;
  profilePictureURL?: string;
  customerFirstName?: string;
  customerLastName?: string;
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
  profilePictureURL,
  customerFirstName,
  customerLastName,
  backLink,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <div className="flex flex-row justify-between items-end gap-8">
          <div className="flex flex-col items-start gap-4">
                      
            {backLink && backLink.url && ( // Check if backLink.url is defined
                      <Link href={backLink.url} legacyBehavior>
                          <a className="text-primary flex items-center gap-1">
                              <span className='pl-2 material-icons' style={{ fontSize: '1rem' }}>arrow_back_ios</span>
                              <span className='hover:underline'>{backLink.label || 'Back'}</span> {/* Use custom label if provided */}
                          </a>
                      </Link>
                  )}

              <div className='flex flex-row gap-2 align-middle items-center'>
                {/*Display for customer avatar if this is a customer page*/}
                {customerFirstName && customerLastName && 
                    <Avatar style={{ width: '60px', height: '60px' }}>
                        <AvatarImage src={profilePictureURL} />
                        <AvatarFallback>{customerFirstName[0] + customerLastName[0]}</AvatarFallback>
                    </Avatar>   
                  }
                  
                  <div className='flex flex-col'>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {description && <p className="text-card-foreground max-w-2xl">{description}</p>}
                  </div>
              </div>
          </div>
          <div className="flex flex-row gap-2">
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
