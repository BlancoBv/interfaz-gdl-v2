import { FC } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/login/Index";
import Layout from "../layout/Layout";

const Index: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      loader: () => {
        const userData = localStorage.getItem("credentials");
        if (userData) {
          return redirect("/app");
        }
        return null;
      },
    },
    {
      path: "/app",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ut ornare tortor. Nunc scelerisque lacinia eros nec ullamcorper.
              Phasellus hendrerit convallis congue. Suspendisse id augue diam.
              In commodo sapien vitae dictum rhoncus. In convallis mattis nibh
              convallis bibendum. Nunc placerat nec quam ut euismod. Nullam
              vestibulum quam sed quam ultrices volutpat. Vivamus aliquam lectus
              et lacus fermentum, ut ultrices ipsum tincidunt. Nam posuere felis
              eu nulla consectetur elementum in ac tellus. Integer sagittis sem
              in elementum tristique. Duis aliquet dolor risus, tincidunt
              facilisis nibh porta nec. Integer euismod nisl pharetra lorem
              malesuada feugiat. Mauris vitae efficitur nisi. Nullam congue diam
              ex, et lobortis tortor rutrum sed. Suspendisse a dignissim tortor.
              Ut quis eros sollicitudin, tristique diam ut, pretium justo.
              Vivamus a eros vitae dolor porttitor maximus. Donec at convallis
              ligula. Mauris nisi nibh, condimentum eget rhoncus eget, fringilla
              sit amet dui. Nulla sit amet scelerisque nisl. Phasellus convallis
              metus venenatis ex vestibulum, at porta leo mattis. Aliquam
              sagittis ornare nisi, vel pulvinar sem efficitur ac. Vestibulum
              luctus viverra odio quis sagittis. Maecenas neque turpis, mattis
              id ipsum eu, accumsan aliquam neque. Mauris tincidunt tincidunt
              tellus, sed molestie dui lobortis at. Aliquam viverra dignissim
              ante, at pellentesque libero. Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Vivamus blandit laoreet ipsum. Proin at
              ipsum viverra, vulputate felis tincidunt, lacinia tortor. Nam
              interdum orci mauris, nec vehicula odio sagittis eget. Maecenas
              vel quam non turpis sodales feugiat sed a nunc. Mauris vel commodo
              augue, eu eleifend augue. Aenean in erat at libero pharetra
              dignissim eu nec purus. Aliquam dignissim, nibh in volutpat
              rutrum, libero neque efficitur nibh, tempus luctus tortor quam at
              risus. Suspendisse interdum nisi gravida erat facilisis, nec
              commodo orci interdum. Nullam ac hendrerit ante. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Sed ultrices
              lacinia justo, et porta odio pellentesque a. Quisque dolor justo,
              dapibus ac odio at, sagittis pellentesque est. Sed gravida neque a
              mauris gravida, nec lacinia augue molestie. Donec consectetur
              nulla sit amet lorem facilisis sagittis. Proin egestas egestas
              faucibus. Suspendisse faucibus ligula interdum, viverra arcu et,
              convallis nibh. Maecenas mollis gravida est sagittis fermentum.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Aenean vitae scelerisque tortor. Nullam a turpis a lectus auctor
              faucibus in sed justo. Morbi tempor elit vel ullamcorper semper.
              Nunc at volutpat elit. Suspendisse vel rhoncus ante. In ornare,
              velit nec dictum aliquet, felis ex blandit tellus, vitae varius
              erat sem eu libero. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur ut ornare tortor. Nunc scelerisque
              lacinia eros nec ullamcorper. Phasellus hendrerit convallis
              congue. Suspendisse id augue diam. In commodo sapien vitae dictum
              rhoncus. In convallis mattis nibh convallis bibendum. Nunc
              placerat nec quam ut euismod. Nullam vestibulum quam sed quam
              ultrices volutpat. Vivamus aliquam lectus et lacus fermentum, ut
              ultrices ipsum tincidunt. Nam posuere felis eu nulla consectetur
              elementum in ac tellus. Integer sagittis sem in elementum
              tristique. Duis aliquet dolor risus, tincidunt facilisis nibh
              porta nec. Integer euismod nisl pharetra lorem malesuada feugiat.
              Mauris vitae efficitur nisi. Nullam congue diam ex, et lobortis
              tortor rutrum sed. Suspendisse a dignissim tortor. Ut quis eros
              sollicitudin, tristique diam ut, pretium justo. Vivamus a eros
              vitae dolor porttitor maximus. Donec at convallis ligula. Mauris
              nisi nibh, condimentum eget rhoncus eget, fringilla sit amet dui.
              Nulla sit amet scelerisque nisl. Phasellus convallis metus
              venenatis ex vestibulum, at porta leo mattis. Aliquam sagittis
              ornare nisi, vel pulvinar sem efficitur ac. Vestibulum luctus
              viverra odio quis sagittis. Maecenas neque turpis, mattis id ipsum
              eu, accumsan aliquam neque. Mauris tincidunt tincidunt tellus, sed
              molestie dui lobortis at. Aliquam viverra dignissim ante, at
              pellentesque libero. Interdum et malesuada fames ac ante ipsum
              primis in faucibus. Vivamus blandit laoreet ipsum. Proin at ipsum
              viverra, vulputate felis tincidunt, lacinia tortor. Nam interdum
              orci mauris, nec vehicula odio sagittis eget. Maecenas vel quam
              non turpis sodales feugiat sed a nunc. Mauris vel commodo augue,
              eu eleifend augue. Aenean in erat at libero pharetra dignissim eu
              nec purus. Aliquam dignissim, nibh in volutpat rutrum, libero
              neque efficitur nibh, tempus luctus tortor quam at risus.
              Suspendisse interdum nisi gravida erat facilisis, nec commodo orci
              interdum. Nullam ac hendrerit ante. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Sed ultrices lacinia justo, et
              porta odio pellentesque a. Quisque dolor justo, dapibus ac odio
              at, sagittis pellentesque est. Sed gravida neque a mauris gravida,
              nec lacinia augue molestie. Donec consectetur nulla sit amet lorem
              facilisis sagittis. Proin egestas egestas faucibus. Suspendisse
              faucibus ligula interdum, viverra arcu et, convallis nibh.
              Maecenas mollis gravida est sagittis fermentum. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Aenean vitae
              scelerisque tortor. Nullam a turpis a lectus auctor faucibus in
              sed justo. Morbi tempor elit vel ullamcorper semper. Nunc at
              volutpat elit. Suspendisse vel rhoncus ante. In ornare, velit nec
              dictum aliquet, felis ex blandit tellus, vitae varius erat sem eu
              libero.{" "}
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Index;
