import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">     
      <div className="p-4 bg-white">
        <img src="https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg" alt="Dish" className="w-24 h-24 object-cover" />
        <h2 className="mt-4 text-xl font-bold">레시피 예시</h2>
        <div className="flex items-center mt-2 space-x-2 text-sm text-muted-foreground">
          <span>작성자: 홍길동</span>
          <span>·</span>
          <span>조회수: 1,234</span>
          <span>·</span>
          <span>좋아요: 123</span>
          <span>·</span>
          <span>댓글: 4</span>
        </div>        
      </div>
      <section>
        <h3 className="text-lg font-semibold">재료</h3>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>간장</TableCell>
              <TableCell className="text-right">5큰술</TableCell>              
            </TableRow>
            <TableRow>
              <TableCell>설탕</TableCell>
              <TableCell className="text-right">3큰술</TableCell>              
            </TableRow>
            <TableRow>
              <TableCell>다진 마늘</TableCell>
              <TableCell className="text-right">1큰술</TableCell>              
            </TableRow>
            <TableRow>
              <TableCell>다진 파</TableCell>
              <TableCell className="text-right">2큰술</TableCell>              
            </TableRow>
            <TableRow>
              <TableCell>참기름</TableCell>
              <TableCell className="text-right">1큰술</TableCell>              
            </TableRow>
            <TableRow>
              <TableCell>후추</TableCell>
              <TableCell className="text-right">약간</TableCell>              
            </TableRow>
          </TableBody>
        </Table>
      </section>      
      <section>
        <h3 className="text-lg font-semibold">조리순서</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-2">              
              <img src="https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg" alt="조리 이미지" className="w-24 h-24 object-cover" />
              <p>1. 소고기는 핏물을 빼서 준비하고, 양념 재료를 모두 섞어 고기에 버무려 30분간 재워둔다.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-2">             
              <img src="https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg" alt="조리 이미지" className="w-24 h-24 object-cover" />
              <p>2. 양파는 채 썰고, 당근은 반달 모양으로 썬다. 버섯은 먹기 좋은 크기로 자른다.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-2">              
              <img src="https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg" alt="조리 이미지" className="w-24 h-24 object-cover" />
              <p>3. 팬에 기름을 두르고, 양파와 당근을 넣어 볶다가 고기를 넣고 볶는다.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-2">             
              <img src="https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg" alt="조리 이미지" className="w-24 h-24 object-cover" />
              <p>4. 고기가 익으면 버섯을 넣고 볶다가, 마지막에 참기름을 넣어 마무리한다.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Tabs defaultValue="reviews">
          <TabsList>
            <TabsTrigger value="reviews">요리후기</TabsTrigger>
            <TabsTrigger value="comments">댓글</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">4.50</span>
                <div className="flex space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <StarHalfIcon className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Min Kyung Kang</span>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p>정말 맛있게 잘 먹었습니다. 레시피도 너무 좋아요!</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>GS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Goo Seok</span>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                    <p>간단하고 맛있어요. 다음에도 또 해먹을 것 같아요.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="comments">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Min Kyung Kang</span>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p>정말 맛있게 잘 먹었습니다. 레시피도 너무 좋아요!</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Goo Seok</span>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                  <p>간단하고 맛있어요. 다음에도 또 해먹을 것 같아요.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

function StarHalfIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
  )
}


function StarIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}