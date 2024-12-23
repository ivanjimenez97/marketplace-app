import { Link } from "react-router-dom";

const Modules = ({ data }) => {
  return (
    <div className="modules flex flex-wrap justify-center items-center">
      {data.map((item, index) => (
        <Link
          to={item.url}
          key={index}
          className="module-item basis-1/2 md:basis-1/3 lg:basis-1/4 mb-10"
        >
          <div className="icon-container bg-white rounded-lg w-[115px] h-[115px] flex justify-center items-center mx-auto mb-3">
            <img
              src={item.icon}
              alt={`Taura - ${item.name}}`}
              className="icon max-w-[85px] mx-auto"
            />
          </div>
          <h5 className="title text-center text-md uppercase">{item.name}</h5>
        </Link>
      ))}
    </div>
  );
};

export default Modules;
