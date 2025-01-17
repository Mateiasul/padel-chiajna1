import { MapComponent } from "../components/map";
import { MapProvider } from "../providers/map-provider";

export default function Location() {
  return (
    <MapProvider>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
            <div className="mx-auto max-w-lg lg:mx-0">
              <div className="hidden sm:mt-32 sm:flex lg:mt-16"></div>
              <h1 className="mt-24 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:mt-10 sm:text-7xl">
                Noua nuastra locatie
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
              </p>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <MapComponent></MapComponent>
          </div>
        </div>
      </div>
    </MapProvider>
  );
}
