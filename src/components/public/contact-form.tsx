"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { submitContactMessage } from "@/actions/contact";
import { AnimateIn } from "@/components/public/animate-in";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    const result = await submitContactMessage(data);

    if (result.success) {
      setSubmitted(true);
      reset();
      toast.success("Mesajınız başarıyla gönderildi!");
    } else {
      toast.error(result.error);
    }
  }

  if (submitted) {
    return (
      <AnimateIn>
        <Card className="border-forest-200 bg-forest-50/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-forest-600" />
            </div>
            <h3 className="text-xl font-semibold text-forest-900 mb-2">
              Mesajınız Alındı!
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              En kısa sürede size dönüş yapacağız. Acil sorularınız için
              WhatsApp üzerinden de bize ulaşabilirsiniz.
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="border-forest-300 text-forest-700"
            >
              Yeni Mesaj Gönder
            </Button>
          </CardContent>
        </Card>
      </AnimateIn>
    );
  }

  return (
    <AnimateIn delay={100}>
      <Card className="border-forest-100 shadow-lg shadow-forest-100/30">
        <CardHeader>
          <CardTitle className="text-forest-900 text-xl">
            İletişim Formu
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Tur, rezervasyon veya özel talepleriniz için bize yazın.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Adınız Soyadınız"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="ornek@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="05XX XXX XX XX"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Konu</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Tur hakkında bilgi"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mesajınız *</Label>
              <Textarea
                id="message"
                {...register("message")}
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-forest-600 hover:bg-forest-700 text-cream"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Mesaj Gönder
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimateIn>
  );
}
