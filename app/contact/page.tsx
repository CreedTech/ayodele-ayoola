import PageTitle from '@/components/PageTitle';
import SectionHeading from '@/components/SectionHeading';
import ContactSection from '@/components/ContactSection';
import MessageForm from '@/components/MessageForm';
import FooterSection from '@/components/FooterSection';

export default function ContactPage() {
  return (
    <main className="col">
      <PageTitle aside="London, open to remote">Contact</PageTitle>
      <div className="rise" style={{ ['--i' as string]: 1, marginTop: 40 }}>
        <ContactSection heading={false} />
      </div>
      <section className="col-sec rise" style={{ ['--i' as string]: 2 }}>
        <SectionHeading>Write a message</SectionHeading>
        <MessageForm />
      </section>
      <FooterSection />
    </main>
  );
}
