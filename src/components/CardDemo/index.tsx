import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  
  type Props = {
    cardTitle: string;
    cardDescription: string;
    cardContent: string;
    cardFooter: string;
  };
  
  export const CardDemo: React.FC<Props> = (props) => {
      return (
        <div className='container mx-auto'>
          <Card>
              <CardHeader className="h-32">
                  <CardTitle>{props.cardTitle}</CardTitle>
                  <CardDescription>{props.cardDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button variant="outline" className="border-solid border-2 border-gray-700">
                      <a href={props.cardContent} target="_blank">
                          Usage {props.cardTitle}
                      </a>
                  </Button>
              </CardContent>
              <CardFooter>
                  <p>{props.cardFooter}</p>
              </CardFooter>
          </Card>
        </div>
      )
    }
  