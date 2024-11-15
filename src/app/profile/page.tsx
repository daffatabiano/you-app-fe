import Link from 'next/link';
import Card from '../components/Card';
import { CiEdit } from 'react-icons/ci';

export default function Page() {
  return (
    <section className="p-2 md:w-1/3 md:m-auto">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-md">About</h1>
            <Link href={'/profile/edit'} className="text-lg">
              <CiEdit />
            </Link>
          </div>

          <p className="text-white/50 font-light text-sm">
            Add in your your to help others know you better
          </p>
        </div>
      </Card>
    </section>
  );
}
