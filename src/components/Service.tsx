export default function Services() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="mb-6 text-2xl font-bold">Our Services</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Currency Wallet",
              description: "Secure your assets with our wallet.",
            },
            {
              title: "Security Storage",
              description: "Reliable storage for your assets.",
            },
            {
              title: "Expert Support",
              description: "Our team is here to help.",
            },
          ].map((service, index) => (
            <div key={index} className="rounded bg-white p-6 shadow">
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="mt-4">{service.description}</p>
              <button className="mt-4 text-blue-600 hover:underline">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
