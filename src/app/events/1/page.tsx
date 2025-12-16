import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptimizedImage from "@/components/OptimizedImage";
import { eventApi, Event } from "@/lib/api/api";

interface PageProps {
  params: {
    id: string;
  };
}

/* ✅ SEO */
export async function generateMetadata({ params }: PageProps) {
  const event = await eventApi.getById(params.id);

  return {
    title: `${event.title} | FitFlix`,
    description: event.description?.slice(0, 150),
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.coverImage || "/fitflix-logo.png"],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const event: Event = await eventApi.getById(params.id);
  const dt = new Date(event.date);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${event.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            {event.title}
          </h1>

          <p className="mt-4 max-w-3xl text-white/90">
            {event.description}
          </p>

          <div className="mt-6 flex gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {dt.toDateString()}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {dt.toLocaleTimeString()}
            </span>
            {event.location && (
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {event.location}
              </span>
            )}
          </div>

          <Button className="mt-8 bg-orange-500 hover:bg-orange-600">
            Register Now
          </Button>
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-zinc-900">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-3">About the Event</h2>
              <p className="text-white/80 whitespace-pre-line">
                {event.description}
              </p>
            </CardContent>
          </Card>

          {event.imageUrls?.length > 0 && (
            <Card className="bg-zinc-900">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.imageUrls.map((img, i) => (
                    <OptimizedImage
                      key={i}
                      src={img}
                      alt="event image"
                      width={400}
                      height={300}
                      className="rounded object-cover"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* REGISTER FORM */}
        <Card className="bg-zinc-900">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Register</h2>

            <form className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="9876543210" />
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                {event.entryFee ? `Register ₹${event.entryFee}` : "Register Free"}
              </Button>
            </form>
          </CardContent>
        </Card>

      </section>
    </div>
  );
}
