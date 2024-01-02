import Topbar from "./Topbar"

interface LayoutProps {
    children: React.ReactNode
}

function PageLayout(props: LayoutProps) {
    return (
        <div className="flex flex-col flex-nowrap items-center w-full min-h-screen bg-go-background bg-cover bg-fixed bg-no-repeat">
            <Topbar />
            <div className="z-0 flex flex-1 justify-center w-full px-4 pt-[176px] pb-0 sm:px-8 xl:px-0">
                <div className="flex flex-col flex-nowrap justify-start w-full space-y-6 max-w-7xl">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default PageLayout;