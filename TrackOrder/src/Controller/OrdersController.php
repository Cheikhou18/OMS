<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Form\OrdersType;
use App\Repository\OrdersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/orders')]
final class OrdersController extends AbstractController
{
    #[Route(name: 'app_orders_index', methods: ['GET'])]
    public function index(OrdersRepository $ordersRepository): JsonResponse
    {
        $orders = $ordersRepository->findAll();

        $data = array_map(function ($order) {
            return [
                'id' => $order->getId(),
                'orderNumber' => $order->getOrderNumber(),
                'status' => $order->getStatus(),
                'product' => $order->getProduct(),
                'client' => $order->getClient(),
            ];
        }, $orders);
    
        return $this->json($data);
    }

    #[Route('/new', name: 'app_orders_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $order = new Orders();
        $order->setOrderNumber($data['orderNumber'] ?? uuid_create());
        $order->setStatus($data['status']);
        $order->setProduct($data['products']);
        $order->setClient($data['client']);
    
        $entityManager->persist($order);
        $entityManager->flush();
    
        return $this->json(['message' => 'Commande créée avec succès !'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_orders_show', methods: ['GET'])]
    public function show(Orders $order): JsonResponse
    {
        $data = [
            'id' => $order->getId(),
            'orderNumber' => $order->getOrderNumber(),
            'status' => $order->getStatus(),
            'products' => $order->getProduct(),
            'client' => $order->getClient(),    
        ];
    
        return $this->json($data);
    }

    #[Route('/{id}/edit', name: 'app_orders_edit', methods: ['PATCH'])]
    public function edit(Request $request, Orders $order, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        
        if (isset($data['orderNumber'])) {
            $order->setOrderNumber($data['orderNumber']);
        }
        if (isset($data['status'])) {
            $order->setStatus($data['status']);
        }
        if (isset($data['products'])) {
            $order->setProduct($data['products']); 
        }
        if (isset($data['client'])) {
            $order->setClient($data['client']);
        }
    
        $entityManager->flush();
    
        return $this->json(['message' => 'Commande mise à jour avec succès !'], JsonResponse::HTTP_CREATED);
        
    }

    #[Route('/{id}/del', name: 'app_orders_delete', methods: ['DELETE'])]
    public function delete(Request $request, Orders $order, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($order);
        $entityManager->flush();
    
        return $this->json(['message' => 'Commande supprimée avec succès !']);
    }
}
