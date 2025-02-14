import { BulbOutlined, ShoppingOutlined } from "@ant-design/icons"

export default function HowItWorks() {
  return (
    <section id="learn" className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16">How it works</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#111111] rounded-3xl p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">1. Choose Your Role</h3>
              <p className="text-gray-400">Sign up as a Creator or Buyer to get started</p>
              <div className="space-y-4 mt-8">
                <div className="bg-black rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium mb-2">For Creators</h4>
                      <p className="text-gray-400 text-sm">Share your expertise with a global audience</p>
                    </div>
                    <BulbOutlined className="text-[#d4ff8e] text-2xl" />
                  </div>
                </div>
                <div className="bg-black rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium mb-2">For Buyers</h4>
                      <p className="text-gray-400 text-sm">Share your expertise with a global audience</p>
                    </div>
                    <ShoppingOutlined className="text-[#d4ff8e] text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111111] rounded-3xl p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">2. Share Your Expertise or Discover New Skills</h3>
              <p className="text-gray-400">
                Creators can monetize their knowledge, and Buyers can enhance their skills
              </p>
              <div className="space-y-4 mt-8">
                <div className="bg-black rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium mb-2">For Creators</h4>
                      <p className="text-gray-400 text-sm">
                        Upload toolkits, set up consultations, and manage your profile
                      </p>
                    </div>
                    <BulbOutlined className="text-[#d4ff8e] text-2xl" />
                  </div>
                </div>
                <div className="bg-black rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium mb-2">For Buyers</h4>
                      <p className="text-gray-400 text-sm">
                        Explore a wide range of resources and book personalized sessions
                      </p>
                    </div>
                    <ShoppingOutlined className="text-[#d4ff8e] text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111111] rounded-3xl p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">3. Earn as You Share or Grow as You Learn</h3>
              <p className="text-gray-400">Make meaningful connections and achieve your goals</p>
              <div className="space-y-4 mt-8">
                <div className="bg-black rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium mb-2">For Creators</h4>
                      <p className="text-gray-400 text-sm">Earn through toolkit sales and consultations</p>
                    </div>
                    <BulbOutlined className="text-[#d4ff8e] text-2xl" />
                  </div>
                </div>
                <div className="bg-black rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium mb-2">For Buyers</h4>
                      <p className="text-gray-400 text-sm">
                        Gain valuable insights and skills to elevate your projects
                      </p>
                    </div>
                    <ShoppingOutlined className="text-[#d4ff8e] text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

