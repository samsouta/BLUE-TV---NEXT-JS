import React, { useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { SubGenreDataType } from '@/src/types/genreType';
import { useRouter } from 'next/router';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';


type DataType = {
    name: string;
    tag: SubGenreDataType[];
};

const GenreButton: React.FC<DataType> = ({ name, tag }) => {
    const router = useRouter();

    const List = ['genres', 'makers', 'series', 'short', 'actresses'];

    const handleAction = useCallback(
        (key: React.Key) => {
            const selectedGenre = key.toString().toLowerCase().replace(/\s+/g, '');

            if (selectedGenre === 'newrelease') {
                // Navigate to the new release page
                router.push(`/new-release`);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else if (List.includes(selectedGenre)) {
                router.push(`/actresses`);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else if (selectedGenre) {
                // For other genres, navigate as usual
                localStorage.setItem('selectedGenre', selectedGenre);
                router.push(`/gn/${selectedGenre}`);

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });

            }


        },
        [router]
    );


    return (
        <div>
            <Dropdown className="bg-black/20 backdrop-blur-xl">
                <DropdownTrigger>
                    <h1 className="flex gap-x-2 items-center poppins font-medium text-[var(--light-blue)] cursor-pointer text-sm lg:text-lg bg-transparent hover:bg-transparent hover:text-[--soft-blue]">
                        {name}
                        <ChevronDown className="text-sm" />
                    </h1>
                </DropdownTrigger>
                <DropdownMenu
                    onAction={handleAction}
                    className="h-[200px] overflow-y-scroll"
                    aria-label="Category Actions"
                    variant="flat"
                >
                    {tag.map((subGenre) => (
                        <DropdownItem
                            key={subGenre.name}
                            textValue={subGenre.name}
                        >
                            <span
                                className={` open-sans font-medium text-sm lg:text-lg  text-[var(--light-blue)]`}
                            >
                                {subGenre.name}
                            </span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default React.memo(GenreButton);
