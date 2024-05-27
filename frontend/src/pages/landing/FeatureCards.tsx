interface CardsData {
  image: string;
  primaryMotive: string;
  secondaryMotive: string;
}
const cardsData: CardsData[] = [
  {
    image: "./src/assets/no_min_order.png",
    primaryMotive: "No minimum order",
    secondaryMotive:
      "Order in for yourself or for your group with no ristrictions on order value",
  },
  {
    image: "./src/assets/status_track.png",
    primaryMotive: "Seamless order status",
    secondaryMotive: "Trace your order seamlessly live with updating status.",
  },
  {
    image: "./src/assets/min_delivery.png",
    primaryMotive: "Faster delivery",
    secondaryMotive:
      "We promise delivery of your food under 30 minutes, so you can enjoy fresh and hot meal",
  },
];
function FeatureCards() {
  return (
    <div className="bg-[#fdfcfd]">
      <div className="container mt-4">
        <div className="row">
          {cardsData.map((item: CardsData, index: number) => {
            return (
              <div className="col-md-4" key={index}>
                <div className="feature-card group">
                  <div className="relative motive-image w-fit my-2 mx-auto">
                    <div className="back-pop"></div>
                    <img
                      src={`${item.image}`}
                      alt="No image"
                      className="h-[120px]"
                    />
                  </div>
                  <div className="motive-slogan">
                    <div className="motive-slogan-primary font-bold text-xl">
                      {item.primaryMotive}
                    </div>
                    <div className="motive-slogan-secondary mt-2">
                      {item.secondaryMotive}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeatureCards;
