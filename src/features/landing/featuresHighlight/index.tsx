export default function FeatureHighlights() {
    const features = [
      {
        title: "Curated Toolkits",
        description: "Create, customize, and monetize your expertise through powerful tools.",
        image:
          "/assets/images/first.png",
      },
      {
        title: "Book Consultations",
        description: "Create, customize, and monetize your expertise through powerful tools.",
        image:'/assets/images/sec.png'
      
     },
      {
        title: "Shareable Profiles",
        description: "Build your brand with unique profiles your audience will love",
        image:
        "/assets/images/third.png",
    },
    ]
  
    return (
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-16">Feature Highlights</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#111111] rounded-3xl p-8 transition-transform hover:scale-105">
                <div className="space-y-4">
                  <h3 className="text-3xl font-medium leading-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-lg">{feature.description}</p>
                  <div className="aspect-square relative mt-8">
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Replace with actual feature-specific illustrations */}
                     
                     <img src={feature.image}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  