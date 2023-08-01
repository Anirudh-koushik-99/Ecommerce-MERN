import { Helmet } from "react-helmet-async"

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "E-comm Electronics",
    description: "One place to find all your electronic products needs",
    keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta
